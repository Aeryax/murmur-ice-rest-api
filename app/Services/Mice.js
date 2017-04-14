'use strict'

const Ice = use('Ice')
const Env = use('Env')
const sprintf = use('sprintf-js').sprintf
const Murmur = use('App/Services/Ice/Murmur').Murmur
const Logger = use('App/Services/Logger')


class Mice {

    constructor() {
        this.communicator = undefined;
        this.logger = Logger.getInstance(this.constructor.name);
    }

    * getMeta() {
        return new Ice.Promise.try(
            () => {
                const iceOptions = new Ice.InitializationData()
                iceOptions.properties = Ice.createProperties([], iceOptions.properties)
                iceOptions.properties.setProperty('Ice.Default.EncodingVersion', '1.0')

                const secret = Env.get('ICE_SECRET')

                if (secret) {
                    iceOptions.properties.setProperty('Ice.ImplicitContext', 'Shared')
                    ice.getImplicitContext().put('secret', secret)
                }

                this.communicator = Ice.initialize(iceOptions)
                var proxy = this.communicator.stringToProxy(sprintf('Meta:tcp -h %s -p %s', Env.get('ICE_HOST'), Env.get('ICE_PORT')))
                return Murmur.MetaPrx.checkedCast(proxy)
            }
        ).exception(
            (error) => {
                switch (error.ice_name()) {
                    default:
                        this.logger.error(sprintf('[mumbleapi]: %s', error))
                        break
                }
            }
        )
    }

    * getCommunicator() {
        return this.communicator
    }

}
