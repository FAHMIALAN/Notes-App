// Mengimpor hook 'useContext' dari React untuk mengakses data dari Context.
import { useContext } from "react";

// Mengimpor 'NotesContext' yang sudah kita buat. Ini adalah "sumber" data kita.
import { NotesContext } from "../context/NotesContext";

// Mengimpor komponen 'NoteItem' yang akan kita gunakan untuk menampilkan setiap catatan.
import NoteItem from "./NoteItem";

/**
 * Komponen NoteList
 * Bertugas untuk menampilkan daftar semua catatan.
 * @param {object} props - Menerima props dari komponen App.
 * @param {Array} props.notes - Array berisi catatan yang akan ditampilkan (hasil dari filter pencarian).
 * @param {Function} props.onEdit - Fungsi yang akan dijalankan saat tombol edit di-klik.
 */
const NoteList = ({ notes, onEdit }) => { 
  // Menggunakan useContext untuk "mengambil" hanya fungsi 'deleteNote' dari NotesContext.
  // Kita tidak perlu mengambil 'notes' dari sini lagi karena sudah didapat dari props.
  const { deleteNote } = useContext(NotesContext);

  // Menggunakan operator ternary untuk logika tampilan:
  // JIKA 'notes.length' lebih dari 0 (ada catatan untuk ditampilkan)...
  return notes.length > 0 ? (
    // ...maka kita memetakan (map) setiap 'note' dalam array 'notes'.
    notes.map((note) => (
      // Untuk setiap 'note', kita render satu komponen 'NoteItem'.
      <NoteItem 
        key={note.id} // 'key' adalah prop wajib di React untuk daftar, isinya harus unik.
        note={note} // Mengirim seluruh data catatan ke komponen NoteItem.
        onEdit={onEdit} // Meneruskan fungsi 'onEdit' ke NoteItem.
        onDelete={deleteNote} // Meneruskan fungsi 'deleteNote' ke NoteItem.
      />
    ))
  // JIKA 'notes.length' adalah 0 (tidak ada catatan)...
  ) : (
    // ...maka kita tampilkan pesan ini.
    <p className="text-gray-600 text-center mt-8">Catatan tidak ditemukan atau belum ada catatan.</p>
  );
};

// Mengekspor komponen NoteList agar bisa digunakan di file lain (seperti App.jsx).
export default NoteList;
