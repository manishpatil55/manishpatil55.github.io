'use client';

import React, { useRef, useEffect, useState, CSSProperties } from 'react';

interface FluidGridProps {
    rows?: number;
    columns?: number;
    containerSize?: string;
    lineColor?: string;
    lineWidth?: string;
    lineHeight?: string;
    maxScale?: number;
    mobileColumns?: number;
    className?: string;
    style?: CSSProperties;
}

const FluidGrid: React.FC<FluidGridProps> = ({
    rows = 9,
    columns = 9,
    containerSize = '80vmin',
    lineColor = '#efefef',
    lineWidth = '1vmin',
    lineHeight = '6vmin',
    maxScale = 1.8,
    mobileColumns,
    className = '',
    style = {}
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentColumns = isMobile && mobileColumns ? mobileColumns : columns;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll<HTMLSpanElement>('span');
        const count = items.length;

        // PHYSICS STATE
        const values = new Float32Array(count).fill(0);
        const velocities = new Float32Array(count).fill(0);
        const targetValues = new Float32Array(count).fill(0);

        // PARAMETERS (TUNED FOR CALMNESS - V9)
        const TENSION = 0.025;   // Slightly tighter spring
        const DAMPING = 0.15;    // High damping (No wobble/jello)
        const SPREAD = 0.05;     // Localized spread (Don't shake the whole room)

        let mouseX = -1000;
        let mouseY = -1000;
        let isHovering = false;

        let animationFrameId: number;

        const loop = () => {
            // 1. INPUT PASS
            for (let i = 0; i < count; i++) {
                targetValues[i] = 0;
            }

            if (isHovering) {
                items.forEach((item, i) => {
                    const rect = item.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

                    if (dist < 120) {
                        // Gentle push
                        const force = (1 - dist / 120) * 0.5; // Reduced from 1.5 to 0.5
                        targetValues[i] = force;
                    }
                });
            }

            // 2. PHYSICS PASS
            for (let i = 0; i < count; i++) {
                const current = values[i];
                const target = targetValues[i];

                const springForce = (target - current) * TENSION;

                const prev = values[i - 1] || 0;
                const next = values[i + 1] || 0;
                const neighborForce = (prev + next - 2 * current) * SPREAD;

                velocities[i] += springForce + neighborForce;
                velocities[i] *= (1 - DAMPING); // Fast settling
                values[i] += velocities[i];
            }

            // 3. RENDER PASS
            items.forEach((item, i) => {
                const val = Math.max(0, values[i]);
                const speed = Math.abs(velocities[i]) * 5;
                const energy = val + speed;

                let r = 168, g = 178, b = 209; // Slate (#a8b2d1)

                if (energy > 0.05) { // Threshold
                    const mix = Math.min(energy * 3, 1);
                    r = r + (100 - r) * mix; // Green
                    g = g + (255 - g) * mix;
                    b = b + (218 - b) * mix;

                    if (energy > 0.6) {
                        const hot = Math.min((energy - 0.6) * 4, 1);
                        r = r + (230 - r) * hot; // White
                        g = g + (241 - g) * hot;
                        b = b + (255 - b) * hot;
                    }

                    item.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    // Subtler shadow
                    item.style.boxShadow = `0 0 ${val * 8}px rgb(${r}, ${g}, ${b})`;
                    item.style.opacity = `${0.2 + val * 0.7}`;
                    // Reduced elastic stretch (Subtle bump)
                    const scale = 1 + val * (maxScale - 1);
                    item.style.transform = `scaleY(${scale})`;
                } else {
                    // Idle
                    if (item.style.opacity !== '0.2') {
                        item.style.backgroundColor = lineColor;
                        item.style.opacity = '0.2';
                        item.style.boxShadow = 'none';
                        item.style.transform = 'scaleY(1)';
                    }
                }
            });

            animationFrameId = requestAnimationFrame(loop);
        };

        const onClick = (e: MouseEvent) => {
            const cx = e.clientX;
            const cy = e.clientY;
            items.forEach((item, i) => {
                const rect = item.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const dist = Math.hypot(cx - x, cy - y);
                if (dist < 300) {
                    velocities[i] += (1 - dist / 300) * 0.8; // Controlled blast
                }
            });
        };

        window.addEventListener('pointermove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isHovering = true;
        });
        window.addEventListener('click', onClick);

        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('click', onClick);
        };
    }, [lineColor, currentColumns]);

    const total = rows * currentColumns;
    const spans = Array.from({ length: total }, (_, i) => (
        <span
            key={i}
            className="block origin-bottom"
            style={{
                backgroundColor: lineColor,
                width: lineWidth,
                height: lineHeight,
                opacity: 0.2,
                willChange: 'transform, opacity, background-color, box-shadow',
                transition: 'none'
            }}
        />
    ));

    return (
        <div
            ref={containerRef}
            className={`grid place-items-center ${className}`}
            style={{
                gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: containerSize,
                height: containerSize,
                ...style
            }}
        >
            {spans}
        </div>
    );
};

export default FluidGrid;
