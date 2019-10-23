# coding:utf8

from common import logger
import sys, os
from entry import frameui

# 和 cx_freeze 这个库有关。这是一个用于在 windows 下将程序打包成 exe 的库，会将一个变量 frozen 注入到 sys 中。
application_path = ''
if getattr(sys, 'frozen', False):
    application_path = os.path.dirname(sys.executable)
elif __file__:
    application_path = os.path.dirname(__file__)

application_path = application_path[:application_path.rfind('/')]
logger.init(application_path)
# logger.init(application_path)
logger.info(application_path)
frameui.run(application_path)
