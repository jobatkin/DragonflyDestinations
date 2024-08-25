import ProfileForm from "@/components/ProfileForm";
import { gluten } from "../fonts";
import styles from "../page.module.css";

export default function ProfilePage() {

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <h2 className={gluten.className}>Profile</h2>

                <ProfileForm />
            </div>
        </main>
    );
}
