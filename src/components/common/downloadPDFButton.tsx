import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface DownloadPDFButtonProps {
    data: Record<string, any>; 
    tableFields: { label: string; key: string }[];
    fileName: string;
    buttonText?: string;
    logoSrc?: string;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
    data,
    tableFields,
    fileName,
    logoSrc = "/Logo/logo.png",
}) => {
    const handleDownload =  () => {
        try {
            const doc = new jsPDF();
            const img = new Image();
            img.src = logoSrc;

            img.onload = () => {
                const pageWidth = doc.internal.pageSize.getWidth();

                // Add logo
                doc.addImage(img, "PNG", 10, 14, 40, 10);
                
                // Header
                doc.setFontSize(20);
                doc.setFont("bold");
                doc.text("Invoice", pageWidth / 2, 20, { align: "center" });

                // Date
                const date = new Date();
                const formattedDate = date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",        
                });
                doc.setFontSize(10);
                doc.text(`Date: ${formattedDate}`, pageWidth - 10, 20, { align: "right" });

                // Table
                autoTable(doc, {
                    startY: 30,
                    theme: "grid",
                    head: [["Field", "Value"]],
                    body: tableFields.map((field) => {
                    let value = data[field.key]
                    if(field.key.toLowerCase().includes("date") && value) {
                        value = new Date(value).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })
                    }
                    return [field.label, value]
                    }),
                });

                doc.save(fileName);
                toast.success("Downloaded ✅");
            };
        } catch (error) {
            toast.error("Failed to download PDF ❌");
        }
    };

    return <Button onClick={handleDownload} className='bg-[#0A51BA] hover:bg-[#0a50bad5] cursor-pointer'>Download</Button>

};

export default DownloadPDFButton;
