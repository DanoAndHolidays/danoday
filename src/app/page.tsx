'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Zap, Book, Activity, GitBranch, ChevronDown } from 'lucide-react';

// Vercel 风格不需要 3D 粒子和矩阵背景
// 但可以保留简单的 Canvas 实验在 PlayGround 中

// 动态导入组件
const Articles = dynamic(() => import('../components/Articles/Articles'), { ssr: false });
const Timeline = dynamic(() => import('../components/Timeline/Timeline'), { ssr: false });
const Projects = dynamic(() => import('../components/Projects/Projects'), { ssr: false });
const Skills = dynamic(() => import('../components/Skills/Skills'), { ssr: false });
const Stats = dynamic(() => import('../components/Stats/Stats'), { ssr: false });
const SocialLinks = dynamic(() => import('../components/SocialLinks/SocialLinks'), { ssr: false });
const PlayGround = dynamic(() => import('../components/PlayGround'), { ssr: false });

export default function Home() {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="app-container">
            <motion.div className="progress-bar" style={{ scaleX }} />

            <header className="hero-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <h1>Dano_Day</h1>
                    <p className="subtitle">前端开发工程师</p>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <ChevronDown size={32} />
                </motion.div>
            </header>

            <main>
                <section id="projects">
                    <h2><GitBranch size={32} /> 精选项目</h2>
                    <Projects />
                </section>

                <section id="skills">
                    <h2><Zap size={32} /> 核心技能</h2>
                    <Skills />
                </section>

                <section id="articles">
                    <h2><Book size={32} /> 最新笔记</h2>
                    <Articles />
                </section>

                <section id="stats">
                    <h2><Activity size={32} /> 个人数据</h2>
                    <Stats />
                </section>

                <section id="timeline">
                    <h2><Activity size={32} /> 个人经历</h2>
                    <Timeline />
                </section>

                <section id="playground">
                    <PlayGround />
                </section>
            </main>

            <footer>
                <SocialLinks />
            </footer>
        </div>
    );
}