// Mengimpor hook 'useContext' dan 'useState' dari React.
import { useContext, useState } from "react";

// Mengimpor 'NotesContext' untuk mengakses fungsi-fungsi global (addNote, updateNote).
import { NotesContext } from "../context/NotesContext";

/**
 * Komponen NoteForm
 * Bertugas untuk menampilkan form untuk menambah atau mengedit catatan.
 * @param {object} props - Menerima props dari komponen App.
 * @param {object|null} props.editNote - Objek catatan yang akan diedit. Jika null, form dalam mode "tambah".
 * @param {Function} props.onCancel - Fungsi untuk membatalkan mode edit.
 */
const NoteForm = ({ editNote, onCancel }) => {
  // Mengambil fungsi 'addNote' dan 'updateNote' dari NotesContext.
  const { addNote, updateNote } = useContext(NotesContext);

  // Membuat state lokal 'note' untuk mengelola nilai input form (judul dan isi).
  // Jika 'editNote' ada isinya, state diinisialisasi dengan data catatan itu.
  // Jika tidak, state diinisialisasi dengan objek kosong.
  const [note, setNote] = useState(editNote || { title: "", content: "" });

  // Fungsi yang dijalankan saat form di-submit.
  const handleSubmit = (e) => {
    // Mencegah halaman refresh saat form disubmit.
    e.preventDefault();

    // Logika untuk membedakan antara mode edit dan mode tambah.
    if (editNote) {
      // Jika 'editNote' ada, panggil fungsi 'updateNote' dari context.
      updateNote(editNote.id, note);
      // Panggil 'onCancel' untuk memberitahu komponen App bahwa mode edit selesai.
      onCancel();
    } else {
      // Jika 'editNote' tidak ada, panggil fungsi 'addNote' dari context.
      addNote(note);
      // Kosongkan kembali form setelah catatan baru ditambahkan.
      setNote({ title: "", content: "" });
    }
  };

  // JSX yang akan dirender oleh komponen.
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      {/* Input untuk judul catatan */}
      <input
        type="text"
        placeholder="Judul catatan"
        value={note.title} // Nilai input dikontrol oleh state 'note.title'.
        onChange={(e) => setNote({ ...note, title: e.target.value })} // Update state saat ada ketikan.
        className="w-full p-2 border rounded mb-2"
        required // Wajib diisi.
      />
      {/* Textarea untuk isi catatan */}
      <textarea
        placeholder="Isi catatan, pisahkan baris dengan Enter"
        value={note.content} // Nilai textarea dikontrol oleh state 'note.content'.
        onChange={(e) => setNote({ ...note, content: e.target.value })} // Update state saat ada ketikan.
        className="w-full p-3 border rounded mb-2 h-40 resize-none" // 'h-40' membuat textarea lebih tinggi.
        required // Wajib diisi.
      />
      {/* Container untuk tombol-tombol */}
      <div className="flex gap-2">
        {/* Tombol Submit */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {/* Teks tombol berubah tergantung mode edit atau tambah. */}
          {editNote ? "Update" : "Tambah"}
        </button>
        
        {/* Tombol Batal (hanya muncul jika dalam mode edit) */}
        {editNote && (
          <button type="button" onClick={onCancel} className="text-red-500">
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

// Mengekspor komponen NoteForm agar bisa digunakan di file lain.
export default NoteForm;
