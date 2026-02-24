// 1. استخراج الكود من الميتا تاج
const metaTag = document.querySelector('meta[name="client_code"]');
const clientCode = metaTag ? metaTag.getAttribute('content') : null;

// 2. إعداد روابط التحويل (غيرها بروابطك الحقيقية)
const externalWebsite = "https://samyahmed480.github.io/su-m/"; // لو الاشتراك انتهى
const wrongCodePage = "https://samyahmed480.github.io/su-m/"; // لو الكود مسروق أو مش موجود

// 3. رابط الـ API بتاع شيت جوجل الخاص بيك
const googleSheetURL = "https://script.google.com/macros/s/AKfycbxV48WX5qZQM5sMMRH2HI5uDonVZTqc1maeMKkJxq8/dev";

// 4. تنفيذ الفحص
if (!clientCode) {
    // مفيش ميتا تاج من الأساس
    window.location.replace(wrongCodePage);
} else {
    // جلب البيانات من جوجل
    fetch(googleSheetURL)
        .then(response => response.json())
        .then(data => {
            
            if (!data.hasOwnProperty(clientCode)) {
                // الكود مش موجود في شيت الإكسيل أصلاً
                window.location.replace(wrongCodePage);
                
            } else if (data[clientCode].status === "2") {
                // الكود موجود بس حالته 2 (موقوف/منتهي)
                window.location.replace(externalWebsite);
                
            } else if (data[clientCode].status === "1") {
                // الكود موجود وحالته 1 (شغال)
                console.log("License is active.");
                // مش هنعمل أي تحويل والموقع هيشتغل طبيعي
            }
            
        })
        .catch(error => {
            console.error("Error checking license:", error);
        });
}
