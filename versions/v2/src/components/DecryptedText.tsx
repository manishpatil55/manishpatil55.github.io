'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
    parentClassName?: string;
    animateOn?: 'view' | 'hover' | 'both';
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'hover',
    ...props
}: DecryptedTextProps) {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isScrambling, setIsScrambling] = useState<boolean>(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    // Grapheme-aware segmentation
    const getGraphemes = (text: string): string[] => {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
            return Array.from(segmenter.segment(text)).map(segment => segment.segment);
        }
        return Array.from(text);
    };

    const graphemes = useMemo(() => getGraphemes(text), [text]);
    const [displayGraphemes, setDisplayGraphemes] = useState<string[]>(graphemes);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        let currentIteration = 0;

        const getNextIndex = (revealedSet: Set<number>): number => {
            const textLength = graphemes.length;
            switch (revealDirection) {
                case 'start':
                    return revealedSet.size;
                case 'end':
                    return textLength - 1 - revealedSet.size;
                case 'center': {
                    const middle = Math.floor(textLength / 2);
                    const offset = Math.floor(revealedSet.size / 2);
                    const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

                    if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
                        return nextIndex;
                    }
                    for (let i = 0; i < textLength; i++) {
                        if (!revealedSet.has(i)) return i;
                    }
                    return 0;
                }
                default:
                    return revealedSet.size;
            }
        };

        const availableChars = useOriginalCharsOnly
            ? Array.from(new Set(graphemes)).filter(char => char !== ' ')
            : Array.from(characters); // Use Array.from for characters to safer split surrogates if any

        const shuffleText = (originalGraphemes: string[], currentRevealed: Set<number>): string[] => {
            if (useOriginalCharsOnly) {
                const positions = originalGraphemes.map((char, i) => ({
                    char,
                    isSpace: char === ' ',
                    index: i,
                    isRevealed: currentRevealed.has(i)
                }));

                const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);

                for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
                }

                let charIndex = 0;
                return positions.map(p => {
                    if (p.isSpace) return ' ';
                    if (p.isRevealed) return originalGraphemes[p.index];
                    return nonSpaceChars[charIndex++];
                });
            } else {
                return originalGraphemes.map((char, i) => {
                    if (char === ' ') return ' ';
                    if (currentRevealed.has(i)) return originalGraphemes[i];
                    return availableChars[Math.floor(Math.random() * availableChars.length)];
                });
            }
        };

        if (isHovering) {
            setIsScrambling(true);
            interval = setInterval(() => {
                setRevealedIndices(prevRevealed => {
                    if (sequential) {
                        if (prevRevealed.size < graphemes.length) {
                            const nextIndex = getNextIndex(prevRevealed);
                            const newRevealed = new Set(prevRevealed);
                            newRevealed.add(nextIndex);
                            setDisplayGraphemes(shuffleText(graphemes, newRevealed));
                            return newRevealed;
                        } else {
                            clearInterval(interval);
                            setIsScrambling(false);
                            return prevRevealed;
                        }
                    } else {
                        setDisplayGraphemes(shuffleText(graphemes, prevRevealed));
                        currentIteration++;
                        if (currentIteration >= maxIterations) {
                            clearInterval(interval);
                            setIsScrambling(false);
                            setDisplayGraphemes(graphemes);
                        }
                        return prevRevealed;
                    }
                });
            }, speed);
        } else {
            setDisplayGraphemes(graphemes);
            setRevealedIndices(new Set());
            setIsScrambling(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovering, graphemes, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]); // Depend on graphemes instead of text

    useEffect(() => {
        if (animateOn !== 'view' && animateOn !== 'both') return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsHovering(true);
                    setHasAnimated(true);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [animateOn, hasAnimated]);

    const hoverProps =
        animateOn === 'hover' || animateOn === 'both'
            ? {
                onMouseEnter: () => setIsHovering(true),
                onMouseLeave: () => setIsHovering(false)
            }
            : {};

    return (
        <motion.span
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap ${parentClassName}`}
            {...hoverProps}
            {...props}
        >
            <span className="sr-only">{text}</span>

            <span aria-hidden="true">
                {displayGraphemes.map((char, index) => {
                    const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;

                    return (
                        <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}
