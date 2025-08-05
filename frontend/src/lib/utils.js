export function formatDate(date) {
    // Om datumet är ett nummer (Unix-tidsstämpel), konvertera det till ett Date-objekt
    const validDate = typeof date === "number" ? new Date(date) : new Date(date);
  
    // Kontrollera om datumet är giltigt
    if (isNaN(validDate.getTime())) {
      return "Invalid Date"; // Hantera ogiltiga datum
    }
  
    // Returnera det formaterade datumet
    return validDate.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }