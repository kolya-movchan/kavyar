package ua.kavyar.service.mapper.impl;

import org.springframework.stereotype.Service;
import ua.kavyar.dto.MessageResponseDto;
import ua.kavyar.service.mapper.ResponseDtoMapper;

@Service
public class MessageResponseDtoMapper implements ResponseDtoMapper<String, MessageResponseDto> {

    @Override
    public MessageResponseDto mapToDto(String s) {
        MessageResponseDto messageResponseDto = new MessageResponseDto();
        messageResponseDto.setMessage(s);
        return messageResponseDto;
    }
}
