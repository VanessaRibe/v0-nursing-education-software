"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, Maximize } from "lucide-react"
import Image from "next/image"

interface Content {
  id: number
  type: "video" | "podcast" | "mindmap"
  title: string
  duration: number
  completed: boolean
  url: string
  description: string
}

interface ContentViewerProps {
  content: Content
}

export function ContentViewer({ content }: ContentViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // TODO: Implement actual media control
  }

  if (content.type === "video") {
    return (
      <div className="space-y-4">
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <Image src={content.url || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button size="lg" className="rounded-full w-16 h-16" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center gap-2 text-white">
              <Button variant="ghost" size="sm" className="text-white hover:text-white">
                <Volume2 className="w-4 h-4" />
              </Button>
              <div className="flex-1 bg-white/20 rounded-full h-1">
                <div
                  className="bg-primary h-1 rounded-full transition-all"
                  style={{ width: `${(currentTime / content.duration) * 100}%` }}
                />
              </div>
              <span className="text-sm">
                {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")} /{" "}
                {Math.floor(content.duration / 60)}:{(content.duration % 60).toString().padStart(2, "0")}
              </span>
              <Button variant="ghost" size="sm" className="text-white hover:text-white">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (content.type === "podcast") {
    return (
      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Volume2 className="w-8 h-8 text-secondary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-2">{content.title}</h4>
              <div className="flex items-center gap-4">
                <Button size="sm" onClick={handlePlayPause} className="rounded-full">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </Button>
                <div className="flex-1 bg-background rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ width: `${(currentTime / content.duration) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.floor(content.duration / 60)}:{(content.duration % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (content.type === "mindmap") {
    return (
      <div className="space-y-4">
        <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
          <Image src={content.url || "/placeholder.svg"} alt={content.title} fill className="object-contain p-4" />
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="sm">
              <Maximize className="w-4 h-4 mr-2" />
              Expandir
            </Button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Clique e arraste para navegar pelo mapa mental interativo</div>
      </div>
    )
  }

  return null
}
