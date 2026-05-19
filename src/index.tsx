@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .parchment-texture {
    background-color: #f3e5c8;
    background-image: 
      radial-gradient(circle at 50% 50%, transparent 60%, rgba(27,18,12,0.15) 100%),
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 40%);
  }
  .rune-border {
    border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Cpath d='M15 0 L30 15 L15 30 L0 15 Z' fill='none' stroke='%23dfb76c' stroke-width='2'/%3E%3C/svg%3E") 30 repeat;
  }
}
