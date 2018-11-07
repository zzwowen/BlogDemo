const db = require('./db')
var express = require('express');
var dateutils = require('vue-dateutils');
var myApp=express();
var path = require('path');
// var router = myApp.Router();

var formidable = require('formidable'),
  fs = require('fs'),
  TITLE = 'formidable上传示例',
  AVATAR_UPLOAD_FOLDER = '/avatar/';
const bodyParser = require('body-parser');
const multer = require('multer');
myApp.use(bodyParser.json());
myApp.use(bodyParser.urlencoded({ extended: false }));

module.exports = function(app) {
  app.all("*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });
  app.post('/api/upload', function(req, res) {
      let form = new formidable.IncomingForm();
      form.encoding = 'utf-8'; // 编码
      form.keepExtensions = true; // 保留扩展名
      form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
      form.uploadDir = '/Library/WebServer/Documents/collection'  // 存储路径
      form.parse(req,function(err,fileds,files){ // 解析 formData数据
          if(err){ return console.log(err) }

          let imgPath = files.file.path // 获取文件路径
          let imgName = "./test." + files.file.type.split("/")[1] // 修改之后的名字
          let imgs=imgPath.split("/");
          let imgurl=imgPath.split("/")[imgs.length-2]+'/'+imgPath.split("/")[imgs.length-1];
          let data = fs.readFileSync(imgPath) // 同步读取文件

          fs.writeFile(imgName,data,function(err){ // 存储文件

              if(err){ return console.log(err) }

              fs.unlink(imgName,function(){}) // 删除文件

              db.imgsModel.create({
                  url: imgPath,
                  name: files.file.name,
                  createDate:dateutils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date()),
                  fileAttribute:files.file.type.split("/")[0],
                  fileType:files.file.type.split("/")[1]
              }, function(err, doc) {
                  if (err) {
                      return  res.end('注册失败:' + err)

                  } else {
                      return   res.json({
                          code: 200,
                          files:{file:imgurl}

                      })

                  }
              })


          })
      })
  });

  ///添加文章
  app.post('/api/addArticle', function(req, res,next) {
      let form = new formidable.IncomingForm();
      form.parse(req,function(err,data){
          db.articleModel.create(data, function(err, doc) {
              if (err) {
                  return  res.json(false)

              } else {
                  return   res.json(true)

              }
          })
      })
  });
  //查询文章
    app.get('/api/article/getArticle',function (req,res) {
        db.articleModel.find({}, function(err, doc) {
            if (err) {
                console.log('查询出错：' + err);
                res.json({
                    code: 700,
                    msg: '查询出错：' + err
                })
                return
            } else {
                if (!doc) {
                    res.json({
                        code: 600,
                        msg: '无数据',
                        data: doc
                    })
                    return
                } else {
                    let newArray=[];
                    doc=doc.forEach((item)=>{
                       let newObj={
                           coverimg:item.coverimg,
                           title:item.title,
                           createtime:item.createtime,
                           author:item.author,
                           _id:item._id
                       };
                        newArray.push(newObj);
                    });
                    res.json({
                        code: 200,
                        msg: '',
                        data: newArray
                    })
                    return
                }

            }
        })
    });
    //通过文章的id获取当前文章的详情
    app.get('/api/article/getArticleDetials',function (req,res) {

        if(req.query){
            let obj= req.query;
            db.articleModel.find(obj, function(err, doc) {
                if (err) {

                            res.json({
                                code: 700,
                                msg: '查询出错：' + err,
                                data:[]
                            })
                            return
                        } else {
                            let q=doc;
                            if (!doc) {
                                res.json({
                                    code: 600,
                                    msg: '无数据',
                                    data: doc
                                })
                                return
                            } else {

                                res.json({
                                    code: 200,
                                    msg: '',
                                    data: doc
                                })
                                return
                            }

                        }
            })
        }else{
            res.json({
                code: 600,
                msg: '无id',
                data:[]
            })
        }
        return
        // db.articleModel.find({}, function(err, doc) {
        //     if (err) {
        //         console.log('查询出错：' + err);
        //         res.json({
        //             code: 700,
        //             msg: '查询出错：' + err
        //         })
        //         return
        //     } else {
        //         if (!doc) {
        //             res.json({
        //                 code: 600,
        //                 msg: '无数据',
        //                 data: doc
        //             })
        //             return
        //         } else {
        //
        //             res.json({
        //                 code: 200,
        //                 msg: '',
        //                 data: doc
        //             })
        //             return
        //         }
        //
        //     }
        // })
    });
  app.get('/api/img/getImgList',function (req,res) {
      db.imgsModel.find({}, function(err, doc) {
          if (err) {
              console.log('查询出错：' + err);
              res.json({
                  code: 700,
                  msg: '查询出错：' + err
              })
              return
          } else {
              if (!doc) {
                  res.json({
                      code: 600,
                      msg: '没有商品',
                      data: doc
                  })
                  return
              } else {
                  res.json({
                      code: 200,
                      msg: '',
                      data: doc
                  })
                  return
              }

          }
      })
  })
  // api login
  app.get('/api/user/login', function(req, res) {
    // 对发来的登录数据进行验证
    if (!req.query.name) {
      res.json({
        code: 600,
        msg: 'name 不能为空！'
      })
      return
    }
    if (!req.query.pwd) {
      res.json({
        code: 600,
        msg: 'pwd 不能为空！'
      })
      return
    }
    db.userModel.findOne({
      name: req.query.name
    }, function(err, doc) {
      if (err) {
        console.log('查询出错：' + err);
        res.json({
          code: 700,
          msg: '查询出错：' + err
        })
        return
      } else {
        if (!doc) {
          res.json({
            code: 700,
            msg: '不存在该用户名：' + req.query.name
          })
          return
        } else {
          if (req.query.pwd != doc.pwd) {
            res.json({
              code: 700,
              msg: '密码不正确！'
            })
            return
          } else {
            res.json({
              code: 200,
              msg: '密码正确，登录成功'
            })
            return
          }
        }

      }
    })
  })
  // api register
  app.get('/api/user/register', function(req, res) {
    // 对发来的注册数据进行验证
    let name = req.query.name
    let pwd = req.query.pwd
    if (!name) {
      res.json({
        code: 600,
        msg: 'name 不能为空！'
      })
      return
    }
    if (!pwd) {
      res.json({
        code: 600,
        msg: 'pwd 不能为空！'
      })
      return
    }
    // 查询数据库验证注册账号、密码
    // 是否存在账号
    db.userModel.findOne({
      name: req.query.name
    }, function(err, doc) {
      if (err) {
        console.log('查询出错：' + err);
        res.json({
          code: 700,
          msg: '查询出错：' + err
        })
        return
      } else {
        if (doc) {
          res.json({
            code: 700,
            msg: '该用户名名已经被注册：' + name
          })
          return
        } else {
          db.userModel.create({
            name: name,
            pwd: pwd
          }, function(err, doc) {
            if (err) {
              res.end('注册失败:' + err)
            } else {
              res.json({
                code: 200,
                msg: '用户注册成功：' + name
              })
              return
            }
          })
        }

      }
    })
    // 返回注册状态
    // res.send(JSON.stringify({code: 200, data: {account: 'guojcres', pass: 111111}}))
  })
  // api index
  app.get('/api/goods/index', function(req, res) {
    let temai = [],
      rexiao = [],
      jingpin = [];

    const getTemai = new Promise((resolve, reject) => {
      db.goodsModel.find({
          brand_status: "temai"
        }, {
          brand_id: 1,
          brand_name: 1,
          brand_price: 1,
          brand_pic: 1,
          brand_status: 1,
          _id: 0
        }, {
          limit: 3
        },
        function(err, doc) {
          if (err) {
            console.log('temai find error!')
            reject('reject temai')
          } else {
            if (!doc) {
              temai = [];
            } else {
              temai = doc;
            }
            resolve(temai)
          }
        })
    })
    // rexiao
    const getRexiao = new Promise((resolve, reject) => {
      db.goodsModel.find({
          brand_status: "rexiao"
        }, {
          brand_id: 1,
          brand_name: 1,
          brand_desc: 1,
          brand_pic: 1,
          brand_status: 1,
          _id: 0
        }, {
          limit: 3
        },
        function(err, doc) {
          if (err) {
            console.log('rexiao find error!');
            reject('reject rexiao')
          } else {
            if (!doc) {
              rexiao = [];
            } else {
              rexiao = doc;
            }
            resolve(rexiao)
          }
        })
    })
    // jingpin
    const getJingpin = new Promise((resolve, reject) => {
      db.goodsModel.find({
          brand_status: "jingpin"
        }, {
          brand_id: 1,
          brand_name: 1,
          brand_price: 1,
          brand_pic: 1,
          brand_status: 1,
          _id: 0
        }, {
          limit: 4
        },
        function(err, doc) {
          if (err) {
            console.log('jingpin find error!')
            reject('reject jingpin')
          } else {
            if (!doc) {
              jingpin = []
            } else {
              jingpin = doc
            }
            resolve(jingpin)
          }
        })
    })

    const p_all = Promise.all([getTemai, getRexiao, getJingpin])

    p_all.then((suc) => {
      let data = {
        "temai": suc[0],
        "rexiao": suc[1],
        "jingpin": suc[2]
      }
      res.json({
        code: 200,
        msg: '',
        data: data
      })
      return
    }).catch((err) => {
      console.log('err all:' + err)
      res.json({
        code: 600,
        msg: '查询出错',
        data: data
      })
      return
    })
  })
  // 精品下拉加载更多api index/jingpin
  app.get('/api/goods/index/jingpin', function(req, res) {
    let nowLength = parseInt(req.query.nowLength)
    db.goodsModel.find({
        brand_status: "jingpin"
      }, {
        brand_id: 1,
        brand_name: 1,
        brand_price: 1,
        brand_pic: 1,
        _id: 0
      }, {
        limit: 4,
        skip: nowLength
      },
      function(err, doc) {
        if (err) {
          console.log('jingpin find error!');
          console.log(err)
        } else {
          if (!doc) {
            // res
            res.json({
              code: 600,
              msg: '没有了',
              data: ''
            })
            return
          } else {
            // res 加载效果，故意延时1s
            setTimeout(() => {
              res.json({
                code: 200,
                msg: '',
                data: doc
              })
              return
            }, 1000)
          }
        }
      }
    )
  })
  // api cate
  app.get('/api/goods/cate', function(req, res) {
    db.goodsModel.find({}, function(err, doc) {
      if (err) {
        console.log('查询出错：' + err);
        res.json({
          code: 700,
          msg: '查询出错：' + err
        })
        return
      } else {
        if (!doc) {
          res.json({
            code: 600,
            msg: '没有商品',
            data: doc
          })
          return
        } else {
          res.json({
            code: 200,
            msg: '',
            data: doc
          })
          return
        }

      }
    })
  })
  // api detail
  app.get('/api/goods/detail', function(req, res) {
    let brand_id = req.query.brand_id
    db.goodsModel.findOne({
      brand_id: brand_id
    }, {
      __v: 0,
      _id: 0
    }, function(err, doc) {
      if (err) {
        console.log('查询出错：' + err);
        res.json({
          code: 700,
          msg: '查询出错：' + err
        })
        return
      } else {
        if (!doc) {
          res.json({
            code: 600,
            msg: '没有商品',
            data: doc
          })
          return
        } else {
          res.json({
            code: 200,
            msg: '',
            data: doc
          })
          return
        }
      }
    })
  })
  // api addToCart
  app.get('/api/goods/addToCart', function(req, res) {
    let brand_id = req.query.brand_id
    let name = req.query.name
    let newCart = req.query
    db.cartsModel.update({
      brand_id: brand_id,
      name: name
    }, {
      $set: newCart
    }, {
      upsert: true
    }, function(err) {
      if (err) {
        console.log('加入购物车失败：' + err);
        res.json({
          code: 700,
          msg: '加入购物车失败：' + err
        })
        return
      } else {
        // add
        res.json({
          code: 200,
          msg: '加入购物车成功'
        })
        return
      }
    })
  })
  // api carts
  app.get('/api/goods/carts', function(req, res) {
    let name = req.query.name
    db.cartsModel.find({
      name: name
    }, {
      __v: 0,
      _id: 0
    }, function(err, doc) {
      if (err) {
        console.log('购物车查询出错：' + err);
        res.json({
          code: 700,
          msg: '购物车查询出错：' + err
        })
        return
      } else {
        if (!doc) {
          res.json({
            code: 600,
            msg: '购物车为空',
            data: doc
          })
          return
        } else {
          res.json({
            code: 200,
            msg: '购物车返回成功',
            data: doc
          })
          return
        }
      }
    })
  })
  // api delectCart
  app.get('/api/goods/delectCart', function(req, res) {
    let brand_id = req.query.brand_id
    let name = req.query.name
    db.cartsModel.remove({
      brand_id: brand_id,
      name: name
    }, function(err) {
      if (err) {
        console.log('购物车删除：' + err);
        res.json({
          code: 700,
          msg: '购物车删除：' + err
        })
        return
      } else {
        // add
        res.json({
          code: 200,
          msg: '购物车删除成功'
        })
        return
      }
    })
  })

  app.get('*', function(req, res) {
    res.end('404')
  })
}
