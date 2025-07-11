// Mengimpor hook 'createContext' dan 'useState' dari React
import { createContext, useState } from "react";

// Mengimpor fungsi 'v4' dari library 'uuid' untuk membuat ID unik.
// Kita menamainya 'uuidv4' agar lebih deskriptif.
import { v4 as uuidv4 } from "uuid";

// Membuat sebuah "Context" baru. Anggap ini sebagai wadah global
// untuk menyimpan data yang bisa diakses oleh komponen manapun.
export const NotesContext = createContext();

/**
 * Komponen NotesProvider
 * Ini adalah komponen khusus yang bertugas "menyediakan" data (state)
 * ke semua komponen yang dibungkusnya.
 * Properti '{children}' merepresentasikan semua komponen yang ada di dalamnya.
 */
export const NotesProvider = ({ children }) => {
  // Menggunakan hook 'useState' untuk membuat state bernama 'notes'.
  // Ini adalah tempat semua data catatan kita akan disimpan dalam bentuk array.
  // Nilai awalnya adalah array kosong [].
  const [notes, setNotes] = useState([]);

  // Fungsi untuk menambah catatan baru.
  const addNote = (note) => {
    // Memperbarui state 'notes' dengan menggunakan 'setNotes'.
    // Caranya: buat array baru yang berisi semua catatan lama (...notes)
    // ditambah satu catatan baru di depannya.
    // Catatan baru ini diberi ID unik menggunakan uuidv4().
    setNotes([{ id: uuidv4(), ...note }, ...notes]);
  };

  // Fungsi untuk memperbarui catatan yang sudah ada.
  const updateNote = (id, updatedNote) => {
    // Kita memetakan (map) setiap catatan dalam array 'notes'.
    // Jika ID catatan (n.id) sama dengan ID yang mau diupdate,
    // kita kembalikan catatan itu dengan data yang sudah diperbarui (...n, ...updatedNote).
    // Jika tidak, kita kembalikan catatan itu apa adanya.
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...updatedNote } : n)));
  };

  // Fungsi untuk menghapus catatan.
  const deleteNote = (id) => {
    // Kita memfilter array 'notes', hanya menyisakan catatan
    // yang ID-nya TIDAK SAMA dengan ID yang mau dihapus.
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Komponen Provider ini akan merender semua 'children'-nya.
  // Properti 'value' adalah bagian terpenting: ini adalah data dan fungsi
  // yang kita "bagikan" ke semua komponen di dalamnya.
  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
