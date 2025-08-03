'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-4xl font-bold text-center">🛠️ Developer Utilities</h1>
      <p className="text-center text-gray-600">Welcome! Explore tools to make your workflow easier and smarter.</p>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <ToolLink
          href="/cv-checker"
          title="CV Checker"
          description="Evaluate your resume against a job description"
        />
        <ToolLink
          href="/pdf-extractor"
          title="PDF Extractor"
          description="Extract plain text content from PDF files"
        />
        <ToolLink
          href="/json-beautifier"
          title="JSON Beautifier"
          description="Format and validate your JSON"
        />
        <ToolLink
          href="/regex-tester"
          title="Regex Tester"
          description="Test regular expressions with sample input"
        />
      </div>
    </main>
  )
}

function ToolLink({
    href,
    title,
    description,
  }: {
    href: string
    title: string
    description: string
  }) {
    return (
      <Link href={href}>
        <Button
          variant="outline"
          className="w-full flex flex-col items-start h-full p-4 text-left space-y-1"
        >
          <span className="text-lg font-semibold">{title}</span>
          <span className="text-sm text-muted-foreground line-clamp-2 break-words">
            {description}
          </span>
        </Button>
      </Link>
    )
  }
  