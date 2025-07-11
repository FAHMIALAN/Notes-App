// Mengimpor hook yang diperlukan dari React
import { useState, useContext } from "react"; 

// Mengimpor Context dan Provider yang sudah kita buat
// Provider untuk "menyediakan" state, Context untuk "mengambil" state
import { NotesProvider, NotesContext } from "./context/NotesContext"; 

// Mengimpor komponen-komponen UI
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

/**
 * Komponen AppContent
 * Komponen ini berisi seluruh tampilan utama aplikasi (form, daftar catatan, pencarian).
 * Kita memisahkannya dari komponen App agar bisa mengakses state dari NotesContext.
 * Sebuah komponen tidak bisa mengakses context yang ia sediakan sendiri.
 */
const AppContent = () => {
  // State untuk menyimpan data catatan yang sedang diedit.
  // Jika null, berarti tidak ada yang diedit (mode tambah).
  const [editNote, setEditNote] = useState(null);

  // State untuk menyimpan teks yang diketik di kolom pencarian.
  const [searchTerm, setSearchTerm] = useState("");

  // Mengambil state 'notes' dari NotesContext menggunakan hook useContext.
  // Ini cara kita mendapatkan data global tanpa perlu passing props berlapis-lapis.
  const { notes } = useContext(NotesContext);

  // Logika untuk memfilter catatan.
  // Array 'notes' akan difilter berdasarkan 'searchTerm'.
  // .toLowerCase() digunakan agar pencarian tidak case-sensitive (tidak peduli huruf besar/kecil).
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Container utama aplikasi
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Judul Aplikasi */}
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">📝 Notes-App</h1>
        
        {/* Form Pencarian */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari judul catatan..."
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            // Nilai input dikontrol oleh state 'searchTerm'
            value={searchTerm}
            // Setiap kali ada ketikan, update state 'searchTerm'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Komponen Form untuk menambah/mengedit catatan */}
        <NoteForm 
          editNote={editNote} // Mengirim data note yang akan diedit
          onCancel={() => setEditNote(null)} // Fungsi untuk membatalkan mode edit
        />

        {/* Komponen untuk menampilkan daftar catatan */}
        {/* Mengirim data 'filteredNotes' (hasil pencarian) untuk ditampilkan */}
        <NoteList 
          notes={filteredNotes} 
          onEdit={(note) => setEditNote(note)} // Fungsi untuk memulai mode edit
        />
      </div>
    </div>
  );
};

/**
 * Komponen App (Komponen Utama)
 * Tugas utamanya adalah membungkus (wrap) seluruh aplikasi dengan NotesProvider.
 * Ini membuat semua komponen di dalam AppContent (dan anak-anaknya) bisa
 * mengakses state yang disediakan oleh NotesContext.
 */
const App = () => {
  return (
    <NotesProvider>
      <AppContent />
    </NotesProvider>
  );
};

export default App;
