# -*- coding:utf-8 -*-
# @Time    :2019/10/22 0022 15:59
# @Author  :Antoy
# @Mail    :286075568@qq.com
# @FileName: test.py
# @Software: PyCharm


import os


res = os.popen('adb shell ps | findstr monkey').read()
res = res.replace('     ',' ')
res = res.replace('    ',' ')
res = res.replace('   ',' ')
res = res.replace('  ',' ')
res = res.split(' ')
if len(res) == 1:
    pass
else:
    print(res[1])
    res = os.popen('adb shell kill -9 ' + res[1]).read()
    print(res)