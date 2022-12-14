import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import { LayoutService } from "../../services/layout/layout.service";
import Image from "next/image";

export interface NavBarProps {
    menuState: boolean;
    menuStateChange: (arg: any) => any;
}

const NavBar: React.FC<NavBarProps> = (navBarProps: NavBarProps) => {

    useEffect(() => {
        handleScroll();
    }, [navBarProps.menuState]);

    const toggleMenu = () => {
        navBarProps.menuStateChange((currentState: boolean) => {
            return !currentState;
        });
    }

    if (typeof window !== "undefined") {
        window.addEventListener('resize', () => {
            !LayoutService.isMobileDevice() ?? navBarProps.menuStateChange(false);
        });
    }

    const handleScroll = () => {
        if (navBarProps.menuState && LayoutService.isMobileDevice()) {
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
            <nav className={`${styles.navBar} ${navBarProps.menuState ? styles.open : styles.closed}`} onClick={() => toggleMenu()}> 
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