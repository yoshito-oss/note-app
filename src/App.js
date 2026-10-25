import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedText, setEditedText] = useState("");

  //メモを追加ボタンを押したときの処理
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      text: "新規ノート📝",
    };

    setNotes((prevNote) => [...prevNote, newNote]);
    setSelectedNote(newNote);
    setEditedText(newNote.text);
  };

  //ノートを選択したときの処理
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setEditedText(note.text);
  };

  //削除ボタンを押したときの処理
  const handleNoteDelete = (noteId) => {
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNotes);

    if (filteredNotes.length > 0) {
      const lastNote = filteredNotes[filteredNotes.length - 1];
      setSelectedNote(lastNote);
    } else {
      setSelectedNote(null);
    }
  };

  //textareaの文字を変更したときの処理
  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  //保存ボタンを押したときの処理
  const handleSave = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === selectedNote.id) {
        return { ...note, text: editedText };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  return (
    <div className="app-container flex">
      {/* サイドバーエリア */}
      <div className="sidebar bg-[#f4f4f4] p-5 h-screen overflow-y-auto shrink-0 basis-[250px]">
        <button className="bg-[#3498db] text-white px-5 py-2.5 border-0 rounded-[5px] cursor-pointer text-base hover:opacity-80" id="create" onClick={handleAddNote}>
          ノート追加
        </button>
        <ul className="list-none mt-2.5">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`flex items-center rounded-[5px] p-2.5 [&_*]:cursor-pointer ${selectedNote.id === note.id ? "bg-[#d2e0e6]" : ""}`}
            >
              <button
                onClick={() => handleNoteDelete(note.id)}
                className="delete mr-2 shrink-0 bg-[#ff6b6b] text-white border-0 rounded-[5px] px-5 py-2.5 border-0 rounded-[5px] cursor-pointer text-base hover:opacity-80"
              >
                削除
              </button>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis grow" onClick={() => handleSelectNote(note)}>
                {note.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* メインエリア */}
      <div className="main p-5 grow">
        {selectedNote ? (
          <>
            <h2 className="mb-5">内容</h2>
            <textarea className="w-full h-[400px] p-[15px] text-base border-0 box-border resize-none focus:outline-none focus:shadow-none focus:border-0" value={editedText} onChange={handleTextChange} />
            <button className="save bg-[#4CAF50] text-white border-0 rounded-[5px] py-2 px-4 hover:bg-[#45a049]" onClick={handleSave}>
              保存
            </button>
          </>
        ) : (
          <p>新しいノートを作成する</p>
        )}
      </div>
    </div>
  );
};

export default App;
