import * as kue from 'kue';

import { queuePriority } from '../entity/dictPub';

import logUtil from '../util/loggerUtil';

const queueConfig = require('../resource/queueConfig');

const queue = kue.createQueue({redis:queueConfig.redis});

let channel;
let exchange = "order";
//如果没有单独配置订单模块的并发处理量则用系统默认并发数
const concurrency = !!queueConfig.orderQueue.concurrency ? queueConfig.orderQueue.concurrency : queueConfig.default_concurrency;
//队列订单标识
const queue_order_sign = "order";

/**
 * 订单队列
 * @class orderQueue
 */
export default class orderQueue {

	/**
	 * 发布订单信息
	 * @param order订单对象
	 * @return 
	 */
	static publish(order, pripority?) {
		pripority = !!pripority ? pripority : queuePriority.normal;

		logUtil.logPublishQueue(queue_order_sign, pripority, order);
		//channel.sendToQueue(q, new Buffer('Hello World!'));

		// if broker is null, we assume the platform in running SELF BROKER mode. 
		let key: string;
		if (order.broker === null) {
			key = "new.order.exchange." + order.exchange;
		} else {
			key = "new.order.broker." + order.broker;
		}
		logUtil.info("key:", key);
		channel.publish(exchange, key, new Buffer(JSON.stringify(order)));

	}

	/**
	 * 订阅订单队列
	 * @param fn 处理方法(系统自动传入两个参数，队列实体、done方法)
	 */
	static subscribe(fn: Function) {
		logUtil.info("subscribe the orderQueue");

	}

}
