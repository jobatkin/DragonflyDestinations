import LoginForm from "@/components/LoginForm";
import { gluten } from "../fonts";
import styles from "../page.module.css";
import RegisterForm from "@/components/RegisterForm";

export default function ConnectPage() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={gluten.className}>Connect</h2>

        <RegisterForm />
      </div>
    </main>
  );
}
