import Head from "next/head";
import { useAuth } from "../lib/auth";
import styles from "../styles/Home.module.css";

function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Beer Book</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Beer Book</h1>
        <div>{auth?.user?.email}</div>
        <button onClick={() => auth.signInWithGoogle("/")}>Sign In</button>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default Home;
