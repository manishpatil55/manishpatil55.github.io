export interface Job {
    id?: string;
    date: string;
    title: string;
    company: string;
    location: string;
    range: string;
    url: string;
    contentHtml: string;
}

export interface Project {
    id?: string;
    date: string;
    title: string;
    company?: string;
    cover: string;
    github?: string;
    external?: string;
    tech: string[];
    cta?: string;
    contentHtml: string;
    slug?: string;
    showInProjects?: boolean;
}

export interface NavLink {
    name: string;
    url: string;
}

export interface SiteConfig {
    email: string;
    socialMedia: {
        name: string;
        url: string;
    }[];
    navLinks: NavLink[];
    colors: {
        green: string;
        navy: string;
        darkNavy: string;
    };
    srConfig: (delay?: number, viewFactor?: number) => any;
}
