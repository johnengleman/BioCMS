import sys
p='biography.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    assert n==count, (n, old[:60])
    s=s.replace(old,new)
rep("In 1298 the Church named him one of its four great Latin teachers, the Doctors of the Church.",
    "By 1298 the whole Church honored him as one of its four great Latin teachers, the Doctors of the Church.")
rep("Patricius was proud of his clever son. He sent the boy to school in the nearby town of Madaura. He spent more than the family could afford on his son’s studies, and the neighbors praised him for it. Saint Augustine wrote that his father cared little how chaste his son grew up, as long as the boy could speak well. In his sixteenth year he was brought home from Madaura and left idle, while money was gathered to send him on to Carthage. “The briars",
    "Patricius was ambitious for his clever son. He sent the boy to school in the nearby town of Madaura. Saint Augustine wrote that his father cared little how chaste his son grew up, as long as the boy could speak well. In his sixteenth year he was brought home from Madaura and left idle, while money was gathered to send him on to Carthage. Patricius meant to spend more than the family could afford on the boy’s studies far from home, and people praised him for it. “The briars")
rep("My swollen pride shrank from their modest style,","My swollen pride shrank from their humble manner,")
rep("He read the sect’s books, defended its teaching, and drew his friends in after him.","He read the sect’s books and drew his friends in after him.")
rep("The trip home was put off. The party went back to Rome for the winter, and they landed at Carthage about September 388. Saint Augustine went to Thagaste, to his own house and fields.",
    "The trip home was put off. Saint Augustine went back to Rome and stayed there until the next year. He landed at Carthage about September 388 and went to Thagaste, to his own house and fields.")
rep("Saint Possidius would later live with Saint Augustine in his monastery and stay his friend for almost forty years. Saint Augustine told him what happened next. Valerius spoke",
    "Saint Possidius, who later lived beside Saint Augustine for almost forty years, tells what happened next. Valerius spoke")
rep("Valerius gave him more than time. Saint Augustine set up a monastery within the church, and the men who joined him owned nothing of their own.",
    "Soon after his ordination, Saint Augustine set up a monastery within the church. Valerius gave him a garden for it, and the men who joined him owned nothing of their own.")
rep("Valerius was Greek by birth and struggled with Latin.","Valerius was Greek by birth and less at home in Latin.")
rep("He sent a hundred gold coins for the poor to soften the request. Saint Augustine groaned.",
    "He sent a hundred gold coins for the poor with the request. Saint Augustine groaned.")
rep("Later he asked for the deed back. ","Later he wrote, through his son, asking that the deed be given back to the son. ")
rep(" go to his room. “I and the others who were at that table experienced this,” Saint Possidius wrote.<sup>"," go to his room.<sup>")
rep("They seized him and his companions, took their animals and baggage, and beat him badly.","They took his animals and baggage and beat him badly.")
rep("was later judged a heretic in court and fined in gold. Saint Augustine then asked the judge not to collect the fine, and the judge agreed.",
    "was later judged a heretic in court and ordered to pay a fine in gold. The Catholic bishop of Calama then asked the judge not to collect the fine, and the judge agreed.")
rep("To Saint Possidius he seemed in those years a limb of Christ,","To Saint Possidius he seemed a chief limb of Christ’s body,")
rep("he went back through all his books, from the first ones","he went back through his books, from the first ones")
rep("Under a fig tree in Milan he had once cried the same words.","Under a fig tree in Milan he had once asked God the same question.")
rep("It was 28 August 430, and he was seventy-six years old.","It was 28 August 430, and he was in his seventy-sixth year.")
rep("He had the shortest psalms of repentance copied out","He had a few of David’s psalms of repentance copied out")
rep("The Holy Sacrifice was offered for her beside the grave, and still he did not weep.","The Mass, the Church’s holy sacrifice, was offered for her beside the grave, and still he did not weep.")
rep("In front of his friends the Holy Sacrifice was offered to God for the peaceful rest of his body, and he was buried.","In front of his friends the Mass was offered to God for the peaceful rest of his body, and he was buried.")
rep("About the year 720 the Lombard king Liutprand","In the 720s the Lombard king Liutprand")
rep("In 1362 a great marble shrine was begun for him there.","In 1362 a great marble shrine was ordered for him there.")
rep("He praised their choice to live together under one roof “with one soul and one heart in God,” and he set down rules for them. Those rules became the Rule of Saint Augustine.",
    "He rebuked them and set down rules for their life together. The first rule was to live in the house in unity, “with your hearts and minds one in God.” Those rules became the Rule of Saint Augustine.")
rep("“You are putting your mother here,” she said.","“Here you will bury your mother,” she said.")
rep("Saint Augustine wrote that he now stood on that rule of faith.","Saint Augustine wrote that he now stood on that rule of faith.")
open(p,'w',encoding='utf-8').write(s)
print('ok')
