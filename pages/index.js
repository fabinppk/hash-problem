import Head from "next/head";
import React, { useState } from "react";
import Router from "next/router";

import styles from "../styles/Home.module.css";
import { useEffect } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);

  const defineHashUrl = () => {
    if (!showMenu) {
      setTimeout(() => {
        Router.push(`${window.location.pathname}#newHash`);
      }, 0);
    }
  };

  const verifyHash = () => {
    const hash = window.location.hash.replace(/^#\/?|\/$/g, "").split("/");
    if (hash[0]) {
      defineHashUrl();
      setShowMenu(true);
      return;
    }
    setShowMenu(false);
  };

  const openMenu = (event) => {
    event.preventDefault();
    defineHashUrl();
    if (showMenu) {
      setShowMenu(false);
      Router.push(window.location.pathname);
      return;
    }
    setShowMenu(true);
  };

  useEffect(() => {
    verifyHash();
    Router.events.on("hashChangeComplete", verifyHash);
    return () => {
      Router.events.off("hashChangeComplete", verifyHash);
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button className={styles.customButton} onClick={openMenu}>
          {!showMenu ? `Push hash` : `Remove hash`}
        </button>
      </main>
    </div>
  );
}
