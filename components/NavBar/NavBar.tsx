import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import { LayoutService } from "../../services/layout/layout.service";
const layoutService = new LayoutService();

const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        handleScroll();
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    window.addEventListener('resize', () => {
        !layoutService.isMobileDevice() ? setMenuOpen(false) : undefined;
    });

    const handleScroll = () => {
        if (isMenuOpen && layoutService.isMobileDevice()) {
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
            </nav>
        </>
    );
}

export default NavBar;