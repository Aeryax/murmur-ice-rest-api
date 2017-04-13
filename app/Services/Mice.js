'use strict'

const Ice = use('Ice')
const Env = use('Env')
const Murmur = use('App/Services/Ice/Murmur').Murmur

class Mice {

    constructor() {
        this.communicator = undefined;
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
                        // TODO : Handle logging
                        break
                }
            }
        )
    }

    * getCommunicator() {
        return this.communicator
    }

}