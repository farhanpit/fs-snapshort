import Link from "next/link";
import logo from "../../public/icons/icon-96x96.png";
import classes from "./main-navigation.module.css";
import Image from "next/image";
import {
  getAllDataFromIndexedDB,
  clearAllDataFromIndexedDB,
} from "../../helper/indexedDB";
import { useEffect } from "react";

function MainNavigation() {
  async function fetchOfflineData() {
    const data = await getAllDataFromIndexedDB();
    if (data.length > 0) {
      try {
        for (const item of data) {
          const formData = {
            title: item.title,
            category: item.category,
            imageUrl: item.imageUrl,
            description: item.description,
          };

          const response = await fetch("/api/gallerys", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const responseData = await response.json();

          if (response.ok) {
            await clearAllDataFromIndexedDB();
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  useEffect(() => {
    fetchOfflineData();
  }, []);

  return (
    <header className={classes.header}>
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/gallerys">Add Gallery</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
