

export const keywordSearch = (haystack, needle) => {
  let parts = needle.split(' ');
  let partQ = '';
  for (let i=0; i<parts.length; i++) {
    if (i==0) {
      partQ = '(?=.*\\b' + parts[i] + ')';
    } else {
      partQ = partQ + '(?=.*\\b' +  parts[i] + ')';
    }
  }

  let re = new RegExp(partQ, 'gi');
  let matching = re.test(haystack);

  return matching;
}
