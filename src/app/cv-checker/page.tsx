'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { ScoreResult } from '@/types/score'
import { useState } from 'react'

export default function CVCheckerPage() {
  const [score, setScore] = useState<number | null>(null)
  const [details, setDetails] = useState<ScoreResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    setLoading(true)
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        body: formData,
      })
        
      const result = await res.json()
      setScore(result.total_score)
      setDetails(result)
    } catch (err) {
      alert('An error occurred while scoring the CV.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Score CV Against JD</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jd">Upload JD (PDF)</Label>
          <Input id="jd" name="jd" type="file" accept="application/pdf" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cv">Upload CV (PDF)</Label>
          <Input id="cv" name="cv" type="file" accept="application/pdf" required />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Scoring in progress...' : 'Score'}
        </Button>
      </form>

      {loading && <Progress value={66} />}

      {score !== null && details && (
        <Card className="mt-6">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">🎯 Evaluation Result</h2>
            <div className="grid grid-cols-2 gap-2">
              <p><strong>Skills:</strong> {details.skill_match}/30</p>
              <p><strong>Experience:</strong> {details.experience_match}/30</p>
              <p><strong>Education:</strong> {details.education_match}/10</p>
              <p><strong>Keywords:</strong> {details.keyword_match}/20</p>
              <p><strong>Presentation:</strong> {details.presentation_score}/10</p>
              <p><strong>Total Score:</strong> <span className="text-xl font-bold">{details.total_score}/100</span></p>
            </div>

            <div className="space-y-2">
              <Label>📋 System Feedback</Label>
              <Textarea
                className="min-h-[300px]"
                readOnly
                value={details.comments}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
