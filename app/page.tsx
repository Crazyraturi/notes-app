"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddNote from "@/components/add-note"
import NotesList from "@/components/notes-list"
import { StickyNoteIcon as Sticky } from "lucide-react"

export default function NotesApp() {
  const [activeTab, setActiveTab] = useState("view")
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Why this nav approach for simplicity: Tabs provide clear visual separation and built-in accessibility
  const handleNoteAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
    setActiveTab("view") // Navigate to view after adding
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sticky className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
          </div>
          <p className="text-gray-600">Simple, fast note-taking with local storage</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="view">View Notes</TabsTrigger>
            <TabsTrigger value="add">Add Note</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-4">
            <NotesList key={refreshTrigger} />
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <AddNote onNoteAdded={handleNoteAdded} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
