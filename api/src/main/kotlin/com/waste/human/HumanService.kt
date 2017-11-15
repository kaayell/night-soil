package com.waste.human

import org.springframework.stereotype.Service

@Service
open class HumanService(var humanRepository: HumanRepository) {

    open fun create(humanRequest: HumanApiWrapper): HumanApiWrapper =
        humanRepository.save(HumanEntity(
            firstName = humanRequest.firstName,
            lastName = humanRequest.lastName,
            email = humanRequest.email,
            hourlyRate = humanRequest.hourlyRate))
            .let { savedEntity ->
                transform(savedEntity)
            }

    open fun update(humanRequest: HumanApiWrapper) {
        humanRepository.save(HumanEntity(
            id = humanRequest.id,
            firstName = humanRequest.firstName,
            lastName = humanRequest.lastName,
            email = humanRequest.email,
            hourlyRate = humanRequest.hourlyRate))
    }

    open fun getAll(): List<HumanApiWrapper> =
        humanRepository.findAll().map { humanEntity -> transform(humanEntity) }

    open fun find(email: String): List<HumanApiWrapper> =
        humanRepository.findByEmail(email)?.let {
            listOf(transform(it))
        }.orEmpty()

    private fun transform(savedEntity: HumanEntity): HumanApiWrapper {
        return HumanApiWrapper(
            id = savedEntity.id,
            firstName = savedEntity.firstName,
            lastName = savedEntity.lastName,
            email = savedEntity.email,
            hourlyRate = savedEntity.hourlyRate)
    }
}