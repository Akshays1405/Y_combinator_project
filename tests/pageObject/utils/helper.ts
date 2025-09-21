import { Page } from "@playwright/test";

export class Helper {
    page: Page
    constructor(page: Page) {
        this.page = page
    }
  
    parseRelativeTime(text: string): Date {
      const now = new Date();
      const [, value, unit] = text.match(/(\d+)\s+(minute|hour|day)/) || [];
      if (!value) return now;
  
      const multipliers: Record<string, number> = {
        minute: 60_000,
        hour: 3_600_000,
        day: 86_400_000
      };
  
      return new Date(now.getTime() - Number(value) * multipliers[unit]);
    }
  
    validateSorting(articles: any[]): boolean {
      console.log("\n🔍 Validating article sorting...\n");
      
      let isSorted = true;
      let previousTime: Date | null = null;
      let errorCount = 0;
      
      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const currentTime = this.parseRelativeTime(article.timeText);
        
    
        console.log(`${article.rank.toString().padStart(3)}. ${article.title.substring(0, 60)}${article.title.length > 60 ? '...' : ''}`);
        console.log(`     Time: ${article.timeText} (${currentTime.toISOString()})`);
        
     
        if (previousTime && currentTime > previousTime) {
          const timeDiff = currentTime.getTime() - previousTime.getTime();
          console.log(`     ❌ SORTING ERROR: Article ${i+1} is ${timeDiff}ms newer than article ${i}`);
          console.log(`     Previous: ${previousTime.toISOString()}`);
          console.log(`     Current:  ${currentTime.toISOString()}`);
          isSorted = false;
          errorCount++;
        }
        
        previousTime = currentTime;
        console.log(""); // empty line for readability
      }
      
      console.log(` Sorting Validation Summary:`);
      console.log(`   Total articles checked: ${articles.length}`);
      console.log(`   Sorting errors found: ${errorCount}`);
      
      if (isSorted) {
        console.log(`   ✅ All articles are correctly sorted from newest to oldest`);
      } else {
        console.log(`   ❌ Found ${errorCount} sorting violations`);
      }
      
      return isSorted;
    }
  }
  