import * as kue from 'kue';

import {queuePriority} from '../entity/dictPub';

import logUtil from '../util/loggerUtil';

const queueConfig = require('../resource/queueConfig');

const queue = kue.createQueue({redis:queueConfig.redis});


//如果没有单独配置订单模块的并发处理量则用系统默认并发数
const concurrency = !!queueConfig.orderQueue.concurrency? queueConfig.orderQueue.concurrency:queueConfig.default_concurrency;
//队列订单标识
const queue_portfolio_sign = "portfolio";

/**
 * 订单队列
 * @class orderQueue
 */
export default class orderQueue{

	/**
	 * 发布订单信息
	 * @param portfolio 交易对象
	 * @return 
	 */
	static publish(portfolio,pripority?){
		pripority  = !!pripority? pripority : queuePriority.normal;	
		logUtil.logPublishQueue(queue_portfolio_sign,pripority,portfolio);
		let job =  queue.create( queue_portfolio_sign, portfolio).priority(pripority).save();
			job.on('job complete', function(id, result){
				kue.Job.get(id, function(err, job){
						if (err) throw err;
					job.remove(function(err){
						if (err) throw err;
						logUtil.info('removed completed job #%d', job.id);
					});
				});

			})
	}

	/**
	 * 订阅订单队列
	 * @param fn 处理方法(系统自动传入两个参数，队列实体、done方法)
	 */
	static subscribe(fn:Function){
		logUtil.info("subscribe the portfolioQueue");
		queue.process( queue_portfolio_sign,concurrency,function(job, done) {
			logUtil.logProgressQueue(queue_portfolio_sign,concurrency,job);
			fn(job.data,done);
		} );
	}

}
