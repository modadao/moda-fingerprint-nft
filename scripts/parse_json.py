#!/usr/bin/env python3

import json
import math


def pair(k1, k2, safe=True):
    """
    Cantor pairing function
    http://en.wikipedia.org/wiki/Pairing_function#Cantor_pairing_function
    """
    z = int(0.5 * (k1 + k2) * (k1 + k2 + 1) + k2)
    if safe and (k1, k2) != depair(z):
        raise ValueError("{} and {} cannot be paired".format(k1, k2))
    return z


def depair(z):
    """
    Inverse of Cantor pairing function
    http://en.wikipedia.org/wiki/Pairing_function#Inverting_the_Cantor_pairing_function
    """
    w = math.floor((math.sqrt(8 * z + 1) - 1)/2)
    t = (w**2 + w) / 2
    y = int(z - t)
    x = int(w - y)
    # assert z != pair(x, y, safe=False):
    return x, y


f = open('./data/fingerprint.json')
data = json.load(f)
sorted_data = {}

pairs = {}

for i in data['coords']:
    sorted_data[i['x']] = i['y']
    count = 0 ## pair[i['x']]
    key = i['x']
    pairs[key] = count + 1

    print(i)


print(len(data['coords']))

for key in sorted(pairs.keys()):
    print(key, " :: ", pairs[key])


for key in sorted(sorted_data.keys()):
    print(key, " :: ", sorted_data[key])


f.close()
