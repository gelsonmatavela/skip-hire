export const codeData = {
    'LE10 1SH': [
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '190', code: 'LE10 1SH' },
      { city: 'Hinckley', streat_name: 'Hinckley', flat_number: '191', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '192', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '193', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '195', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '196', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '197', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '198', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '199', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '200', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '201', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '202', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '203', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '204', code: 'LE10 1SH' },
      { city: 'Ashby Road', streat_name: 'Hinckley', flat_number: '205', code: 'LE10 1SH' },
    ]
  };
  
  export const fetchCodes = (query: string) => {
    return new Promise<{ code: string; city: string; streat_name: string; flat_number: string }[]>((resolve, reject) => {
      const result = Object.entries(codeData)
        .filter(([code]) => code.toLowerCase().includes(query.toLowerCase()))
        .flatMap(([code, options]) =>
          options.map(({ city, streat_name, flat_number }) => ({
            code,
            city,
            streat_name,
            flat_number: String(flat_number),
          }))
        );
  
      if (result.length > 0) {
        resolve(result);
      } else {
        reject('No code located');
      }
    });
  };
  