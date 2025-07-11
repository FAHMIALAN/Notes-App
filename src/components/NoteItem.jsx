/**
 * Komponen NoteItem
 * Ini adalah komponen "anak" yang bertugas menampilkan SATU buah catatan.
 * Komponen ini tidak memiliki state sendiri, ia hanya menerima data (props) dari induknya (NoteList).
 * @param {object} props - Menerima props dari komponen NoteList.
 * @param {object} props.note - Objek yang berisi data satu catatan (id, title, content).
 * @param {Function} props.onEdit - Fungsi yang akan dipanggil saat tombol "Edit" diklik.
 * @param {Function} props.onDelete - Fungsi yang akan dipanggil saat tombol "Hapus" diklik.
 */
const NoteItem = ({ note, onEdit, onDelete }) => (
  // Container utama untuk satu item catatan.
  // 'mb-4' memberi jarak bawah antar catatan.
  <div className="bg-yellow-100 p-4 rounded shadow mb-4">
    {/* Menampilkan judul catatan. */}
    <h3 className="text-lg font-bold">{note.title}</h3>

    {/* Menampilkan isi catatan. */}
    {/* 'whitespace-pre-line' adalah kelas Tailwind yang sangat penting di sini. */}
    {/* Ini membuat baris baru (Enter) yang diketik di textarea akan tetap ditampilkan sebagai baris baru. */}
    <div className="whitespace-pre-line">{note.content}</div>

    {/* Container untuk tombol-tombol aksi. */}
    <div className="mt-2 flex gap-4">
      {/* Tombol Edit */}
      {/* Saat diklik, tombol ini akan memanggil fungsi 'onEdit' yang diterima dari props. */}
      {/* Kita mengirim seluruh objek 'note' agar komponen App tahu catatan mana yang mau diedit. */}
      <button onClick={() => onEdit(note)} className="text-blue-600 font-semibold">Edit</button>

      {/* Tombol Hapus */}
      {/* Saat diklik, tombol ini akan memanggil fungsi 'onDelete' yang diterima dari props. */}
      {/* Kita hanya perlu mengirim 'note.id' karena hanya ID yang dibutuhkan untuk proses penghapusan. */}
      <button onClick={() => onDelete(note.id)} className="text-red-600 font-semibold">Hapus</button>
    </div>
  </div>
);

// Mengekspor komponen NoteItem agar bisa diimpor dan digunakan oleh komponen lain (NoteList.jsx).
export default NoteItem;
