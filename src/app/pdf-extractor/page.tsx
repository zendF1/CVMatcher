"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function PDFExtractorPage() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setLoading(true);
        try {
            const res = await fetch("/api/pdf-extract", {
                method: "POST",
                body: formData,
            });

            const data = await res.text();
            setText(data.trim());
        } catch (err) {
            alert("Something went wrong while extracting PDF text");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 space-y-6">
            <h1 className="text-3xl font-bold">PDF Text Extractor</h1>

            <form onSubmit={handleExtract} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="pdf">Upload PDF</Label>
                    <Input
                        id="pdf"
                        name="pdf"
                        type="file"
                        accept="application/pdf"
                        required
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Extracting..." : "Extract Text"}
                </Button>
            </form>

            {loading && <Progress value={66} />}

            {text && (
                <Card className="mt-6">
                    <CardContent className="p-4 space-y-2">
                        <Label>Extracted Text</Label>
                        <Textarea
                            className=" font-mono text-sm"
                            readOnly
                            value={text}
                            rows={Math.min(30, Math.ceil(text.length / 100))}
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
