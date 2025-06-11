"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus } from "lucide-react"
import { saveNote } from "@/lib/storage"

interface AddNoteProps {
  onNoteAdded: () => void
}

export default function AddNote({ onNoteAdded }: AddNoteProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Why I chose useState + this submit handler: Controlled components provide predictable state management and easy validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Why show spinner here: Provides immediate feedback even for fast localStorage operations
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate brief delay for UX

      const success = saveNote({
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
      })

      if (success) {
        setTitle("")
        setContent("")
        onNoteAdded()
      } else {
        setError("Failed to save note. Storage might be full.")
      }
    } catch (err) {
      setError("An unexpected error occurred while saving.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Note
        </CardTitle>
        <CardDescription>Create a new note that will be saved locally in your browser</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note content here..."
              disabled={isLoading}
              className="w-full min-h-[120px] resize-none"
            />
          </div>

          <Button type="submit" disabled={isLoading || !title.trim() || !content.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Save Note
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
