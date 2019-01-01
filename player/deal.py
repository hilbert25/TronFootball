f = open("player_data.txt",'r')
res = open("data.txt",'w+')
i = 0
for l in f:
    data = l.split(":")[1][1:-3]
    data = data.split(",")
    print "player_list["+str(i)+"] = Player(\""+data[0]+"\",",data[1],",",data[2],",",data[3],",",data[7],");"
    i+=1
