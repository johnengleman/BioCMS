p='biography.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    assert n==count, (n, old[:60])
    s=s.replace(old,new)
rep("Augustine, <em>Confessions</em> III.1.1 (our translation); Butler, <em>Lives</em>, vol. 8, p. 412, note 8.","Augustine, <em>Confessions</em> III.1.1, IV.2.2 (our translation); Butler, <em>Lives</em>, vol. 8, p. 412, note 8.")
rep("Possidius, <em>Life of Augustine</em> 5; Weiskotten, introduction and note 1 to ch. 1.","Possidius, <em>Life of Augustine</em> 5; Weiskotten, introduction, note 1 to ch. 1, and note 2 to ch. 5 (Augustine, Sermon 355).")
rep("Butler, <em>Lives</em>, vol. 8, p. 478; Augustine, <em>City of God</em> XIV.28 (our translation).","Benedict XVI, General Audience, 20 February 2008; Butler, <em>Lives</em>, vol. 8, p. 478; Augustine, <em>City of God</em> XIV.28 (our translation).")
rep("Augustine, Letter 211.2 (our translation from the public-domain English)","Augustine, Letter 211.4–5 (our translation from the public-domain English)")
rep("<li>Benedict XVI. General Audience on Saint Augustine of Hippo, 20 February 2008. EWTN, <a href=\"https://www.ewtn.com/catholicism/library/st-augustine-of-hippo-6356\">https://www.ewtn.com/catholicism/library/st-augustine-of-hippo-6356</a>.</li>",
    "<li>Benedict XVI. General Audience on Saint Augustine, 20 February 2008. Vatican, <a href=\"https://www.vatican.va/content/benedict-xvi/en/audiences/2008/documents/hf_ben-xvi_aud_20080220.html\">https://www.vatican.va/content/benedict-xvi/en/audiences/2008/documents/hf_ben-xvi_aud_20080220.html</a>.</li>")
rep("Josef Sciberras writes that no reliable document tells how the relics reached Pavia from Africa, and that scholars kept arguing after the ruling of 1728.",
    "Josef Sciberras writes that no reliable document tells how the relics left Africa for Sardinia, and that scholars argued about the find for years before the ruling of 1728.")
rep("Letters 21 and 211 were put into plain English from public-domain translations.","Letters 21, 211, and 228 were put into plain English from public-domain translations.")
open(p,'w',encoding='utf-8').write(s)
print('ok')
