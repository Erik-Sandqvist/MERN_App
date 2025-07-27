export function formatDate(date) {
    const validDate = new Date(date); // Konvertera till ett Date-objekt
    if (isNaN(validDate)) {
        return "Invalid Date"; // Hantera ogiltiga datum
    }
    return validDate.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}