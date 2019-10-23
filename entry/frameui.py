#!/usr/bin/env python
# -*- coding:utf-8 -*-
import sys
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QObject, pyqtSlot, QUrl
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView
from monkey import monkey


def run(p='.'):
    app = QApplication(sys.argv)
    view = QWebEngineView()
    channel = QWebChannel()
    handler = monkey.op()
    channel.registerObject('pyjs', handler)
    view.page().setWebChannel(channel)
    url_string = p + "/lib/pages/index.html"
    view.load(QUrl(url_string))
    view.resize(1366, 880)
    view.show()
    sys.exit(app.exec_())


if __name__ == '__main__':
    app = QApplication(sys.argv)
    view = QWebEngineView()
    channel = QWebChannel()
    handler = monkey.op()
    channel.registerObject('pyjs', handler)
    view.page().setWebChannel(channel)
    url_string = "E:/software/Python/myframe/lib/pages/index.html"
    view.load(QUrl(url_string))
    view.resize(1366, 880)
    view.show()
    sys.exit(app.exec_())
