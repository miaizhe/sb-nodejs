addEventListener('scheduled', event => event.waitUntil(handleScheduled()));
// 每个保活网页之间用空格或者，或者,间隔开，网页前带https://
const urlString = 'https://mm.ftyfty2021.dpdns.org,https://mm.ftyfty2021.dpdns.org/56d2c2c0-0de1-4c3b-bcc0-a1f7dc32dab7';
const urls = urlString.split(/[\s,，]+/);
const TIMEOUT = 5000;
async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    await fetch(url, { signal: controller.signal });
    console.log(`✅ 成功: ${url}`);
  } catch (error) {
    console.warn(`❌ 访问失败: ${url}, 错误: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}
async function handleScheduled() {
  console.log('⏳ 任务开始');
  await Promise.all(urls.map(fetchWithTimeout));
  console.log('📊 任务结束');
}
