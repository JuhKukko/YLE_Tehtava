export const parseCSV = (text) => {
    const lines = text.replace(/\r/g, '').split('\n');
    const result = [];
    
    const headers = ["Kunta", "Varhaiskasvatus", "Vieraskieliset"];
    const delimiterChar = ',';

    for (let i = 0; i < lines.length; i++) {
      if (!lines[i] || lines[i].trim() === '') continue;

      const currentline = lines[i].split(delimiterChar);

      if (currentline.length < headers.length) continue;

      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = currentline[index] ? currentline[index].trim() : "";
      });

      obj['Koodi'] = obj['Kunta'];

      result.push(obj);
    }
    return result;
  };