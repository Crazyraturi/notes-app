export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

const STORAGE_KEY = "notes-app-data"

// Why localStorage + key naming: localStorage provides persistent client-side storage, and a prefixed key prevents conflicts with other apps
export function saveNote(noteData: Omit<Note, "id">): boolean {
  try {
    const notes = getNotes()
    const newNote: Note = {
      ...noteData,
      id: generateId(),
    }

    const updatedNotes = [newNote, ...notes]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes))
    return true
  } catch (error) {
    console.error("Failed to save note:", error)
    return false
  }
}

export function getNotes(): Note[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error("Failed to load notes:", error)
    return []
  }
}

export function deleteNote(id: string): boolean {
  try {
    const notes = getNotes()
    const filteredNotes = notes.filter((note) => note.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes))
    return true
  } catch (error) {
    console.error("Failed to delete note:", error)
    return false
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
