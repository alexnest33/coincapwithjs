export const formatPrice = (num) => {
    if (!num) return '-';
    const value = parseFloat(num);
    return <span style={{ 
      fontWeight: '600',          
      color: '#222',              
      fontSize: '15px',           
    }}>
      {value.toFixed(2)}$
    </span>
  };
  
  export const formatMarketCap = (num) => {
    if (!num) return '-';
    const value = parseFloat(num);
    if (value >= 1_000_000_000_000) {
      return `${(value / 1_000_000_000_000).toFixed(1)} трлн $`;
    } else if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)} млрд $`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)} млн $`;
    }
    return `${value.toFixed(2)} $`;
  };

  export const formatVWAP = (num) => {
    if (!num) return '-';
    return `${parseFloat(num).toFixed(2)} $`;
  };
  
  export const formatChangePercent = (num) => {
    if (!num) return '-';
    const value = parseFloat(num);
    const color = value >= 0 ? 'green' : 'red';
    const sign = value > 0 ? '+' : '';
    return <span style={{ color }}>{`${sign}${value.toFixed(2)} %`}</span>;
  };
  
  export const formatRu2 = (n) =>
    new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(n) || 0);

    export const signedMoney = (n) => {
      const v = Number(n) || 0;
      const sign = v > 0 ? "+" : v < 0 ? "-" : "";
      return `${sign}${formatRu2(Math.abs(v))}`;
    };
    
    export const signedPercent = (n) => {
      const v = Number(n) || 0;
       const cleaned = Math.abs(v) < 0.005 ? 0 : v;
  const sign = cleaned > 0 ? "+" : cleaned < 0 ? "-" : "";
      return `${sign}${formatRu2(Math.abs(cleaned))}`;
    };