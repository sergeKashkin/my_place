import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import { LayoutService } from "../../services/layout/layout.service";

const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        handleScroll();
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    if (typeof window !== "undefined") {
        window.addEventListener('resize', () => {
            !LayoutService.isMobileDevice() ?? setMenuOpen(false);
        });
    }

    const handleScroll = () => {
        if (isMenuOpen && LayoutService.isMobileDevice()) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
    }

    return (
        <>
            <div className={styles.menuButton} onClick={() => toggleMenu()}>
                <div className={styles.menuButtonHandler}>⋮</div>
            </div>
            <nav className={`${styles.navBar} ${isMenuOpen ? styles.open : styles.closed}`} onClick={() => toggleMenu()}> 
                <div className={styles.info}>
                    <div className={styles.infoTitle}>Sergei</div>
                    <div className={styles.infoTitle}>Kashkin</div>
                </div>
                <Link href="/">
                    <a className={styles.title}>Home</a>
                </Link>
                <Link href="/#latest_posts">
                    <a className={styles.title}>Latest Posts</a>
                </Link>
                <Link href="/posts">
                    <a className={styles.title}>All posts</a>
                </Link>
                <Link href="/#contact">
                    <a className={styles.title}>Contact</a>
                </Link>
                <Link href="/#toolbox">
                    <a className={styles.title}>Toolbox</a>
                </Link>
                <div className={styles.personalInfo}>
                <div className={styles.email}>
                    <a href="mailto:sergmaloi@gmail.com">sergmaloi@gmail.com</a>
                </div>
                <div className={styles.thumbnails}>
                    <div className={styles.thumbnail}>
                        <Link href="https://www.linkedin.com/in/kashkin-sergei/">
                            <img src="/icons/linkedin.png"></img>
                        </Link>
                    </div>
                    <div className={styles.thumbnail}>
                        <Link href="https://github.com/sergeKashkin">
                            <img src="/icons/github.png"></img>
                        </Link>
                    </div>
                </div>
            </div>
            </nav>
        </>
    );
}

export default NavBar;