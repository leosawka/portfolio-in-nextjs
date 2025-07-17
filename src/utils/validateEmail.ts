const blacklistedDomains = new Set([
  '10minutemail.com', 'tempmail.com', 'temp-mail.org', 'tempmail.net', 'tempmail.dev',
  'mailinator.com', 'maildrop.cc', 'mailnesia.com', 'dispostable.com', 'getnada.com',
  'trashmail.com', 'guerrillamail.com', 'mintemail.com', 'mailnull.com', 'throwawaymail.com',
  'fakemail.net', 'fakemailgenerator.com', 'spamgourmet.com', 'inboxalias.com',
  'emailondeck.com', 'easytrashmail.com', 'yopmail.com', 'mailcatch.com', 'boun.cr',
  'mail-tester.com', 'mytemp.email', 'mvrht.com', 'mailarmy.com', 'spam4.me',
  'deadaddress.com', 'spambog.com', 'trbvm.com', 'spamex.com',
  'example.com', 'example.org', 'test.com', 'testmail.com', 'email.com', 'nospam.com',
  '0clickemail.com', 'nowhereemail.com', 'fakeinbox.com', 'anonaddy.me',
  'chacuo.net', 'sharklasers.com', 'qq.com', 'sina.cn',
  'fakemail.jp', '0wnd.net', 'ruru.be',
  'daum.net', 'nate.com', 'happymail.jp', 'kakao.com',
  'mail.ru', 'bk.ru', 'inbox.ru', 'list.ru', 'yandex.ru', 'rambler.ru',
  'tut.by', 'pochta.ru', 'tempmail.ru', 'zxcvbnm.com', 'trashmail.me',
  'noreply.com', 'none.com', 'null.net', 'abc.com', 'xyz.com', 'foo.com', 'bar.com', 'localhost'
]);

const blacklistedLocalParts = new Set([
  'noreply', 'no-reply', 'replyto', 'donotreply', 'nobody', 'null', 'test', 'tester', 'example',
  'demo', 'admin', 'support', 'contact', 'info', 'mail', 'email', 'automated', 'bot',
  'prueba', 'ejemplo', 'correo', 'automatico', 'responder', 'soporte',
  'teste', 'exemplo', 'naoresponder', 'automático', 'suporte',
  'essai', 'exemple', 'nepasrepondre', 'automatique', 'aide', 'repondezpas',
  'beispiel', 'nichtantworten', 'hilfe', 'unterstützung',
  'esempio', 'nonrispondere', 'prova', 'supporto', 'risposta',
  'abuse', 'spam', 'system', 'robot', 'webmaster', 'administrator',
  '测试', '例子', '管理员', '垃圾邮件', '不回复',
  'テスト', 'サンプル', '管理者', '返信不要', '自動送信', '迷惑メール',
  '테스트', '샘플', '관리자', '회신금지', '자동발신', '스팸',
  'тест', 'пример', 'админ', 'поддержка', 'ответне требуется', 'спам', 'автоответ'
]);

const isEmailFormatValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isEmailValid = (email: string): boolean => {
  if (!isEmailFormatValid(email)) return false;

  const [local, domain] = email.toLowerCase().split('@');

  if (!local || !domain) return false;

  const isBlacklistedDomain = blacklistedDomains.has(domain);
  const isBlacklistedLocal = Array.from(blacklistedLocalParts).some(keyword =>
    local.includes(keyword)
  );

  return !isBlacklistedDomain && !isBlacklistedLocal;
};
