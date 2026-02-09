import { db } from "./firebase.js";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("bookingForm");
const messageBox = document.getElementById("messageBox");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const style = form.style.value;
    const date = form.date.value;

    if (!name || !email || !style || !date) {
        messageBox.textContent = "Por favor preenche todos os campos.";
        messageBox.classList.add("text-red-500");
        return;
    }

    try {
        await addDoc(collection(db, "bookings"), {
            name,
            email,
            style,
            date,
            createdAt: Timestamp.now()
        });

        messageBox.textContent = "Marcação enviada com sucesso!";
        messageBox.classList.remove("text-red-500");
        messageBox.classList.add("text-green-500");

        form.reset();
    } catch (error) {
        messageBox.textContent = "Erro ao enviar marcação.";
        messageBox.classList.add("text-red-500");
    }
});
