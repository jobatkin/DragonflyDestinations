import ForgotPassword from "@/components/ForgotPassword";
import { gluten } from "../fonts";
import styles from "../page.module.css";

export default function ForgotPasswordPage() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={gluten.className}>Connect</h2>

        <ForgotPassword />
      </div>
    </main>
  );
}
