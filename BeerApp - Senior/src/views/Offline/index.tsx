import { useEffect, useState } from 'react';
import { Alert, AlertTitle } from "@mui/material";
import styles from './Offline.module.css'

const Offline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.addEventListener('online', setOnline);
      window.addEventListener('offline', setOffline);
    };
  }, []);

  return isOnline ? null : (
    <article className={styles.container}>
      <section>
        <Alert severity="warning">
          <AlertTitle>You are offline</AlertTitle>
          App has limited functionality on offline mode
        </Alert>
      </section>
    </article>
  );
};

export default Offline;
