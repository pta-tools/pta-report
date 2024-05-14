import jsPDF from "jspdf";
import EventReport from "./EventReport";

function downloadPDF(report: EventReport) {
    const {
        eventName,
        familyName,
        givenName,
        year,
        month,
        day,
        eventContent,
        impressions,
        additionalHeading,
        additionalText
    } = report;

    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4"
    });

    doc.addFont("/pta-report/fonts/NotoSansJP-Regular.ttf", "NotoSansJP", "normal");
    doc.setFont("NotoSansJP");

    // タイトル
    doc.setFontSize(18);
    doc.text(`${eventName} 参加報告書`, 105, 25, { align: "center" });

    // 作成者と参加日
    doc.setFontSize(10);
    doc.text(`作成者: ${familyName} ${givenName}`, 200, 35, { align: "right" });
    doc.text(`参加日: ${year}年${month}月${day}日`, 200, 40, { align: "right" });

    // イベントの内容
    let currentHeight = 55;
    doc.setFontSize(14);
    doc.text("イベントの内容", 15, currentHeight);
    doc.setFontSize(12);
    currentHeight += 10;
    doc.text(eventContent, 15, currentHeight, { maxWidth: 180 });

    // 次のセクションへの余白を調整
    const contentHeight = doc.getTextDimensions(eventContent, { maxWidth: 180 }).h;
    currentHeight += contentHeight + 15;

    // イベントに参加した感想
    doc.setFontSize(14);
    doc.text("イベントに参加した感想", 15, currentHeight);
    doc.setFontSize(12);
    currentHeight += 10;
    doc.text(impressions, 15, currentHeight, { maxWidth: 180 });

    // 追加テキストがある場合の処理
    const impressionsHeight = doc.getTextDimensions(impressions, { maxWidth: 180 }).h;
    currentHeight += impressionsHeight + 15;
    if (additionalHeading) {
        doc.setFontSize(14);
        doc.text(additionalHeading, 15, currentHeight);
        doc.setFontSize(12);
        currentHeight += 10;
        doc.text(additionalText, 15, currentHeight, { maxWidth: 180 });
    }

    // PDFを保存
    doc.save(`${eventName}_参加報告書.pdf`);
}

export default downloadPDF;